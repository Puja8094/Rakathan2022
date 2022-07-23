import uvicorn
from fastapi import FastAPI, File, UploadFile
import easyocr as ocr
from PIL import Image
import numpy as np
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

import regex as re

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def index():
    return {'message': 'Hello, This is an API for OCR'}


def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    image = read_imagefile(await file.read())
    image = np.asarray(image)
    PAN = 'NAN'
    Name = 'NAN'
    FatherName = 'NAN'
    DOB = 'NAN'
    reader = ocr.Reader(['en'], model_storage_directory='.')
    OCR_text = reader.readtext(image, detail=0, width_ths=0.9)
    datepatn = r'\d+[-/]\d+[-/]\d+'
    panpatn = r'([A-Z]){5}([O0-9]){4}([A-Z]){1}'
    godpatn = r'([A-Z]+)\s([A-Z]+)\s([A-Z]+)$|([A-Z]+)\s([A-Z]+)$'

    gov = [i for i, txt in enumerate(OCR_text) if 'GOVT' in txt][0]
    OCR_text = OCR_text[gov + 1:]
    temp = []
    for text in OCR_text:
        name = re.search(godpatn, text)
        if name:
            temp.append(name.group())

    # Handle 'O's in Digits
    temp = ''
    for i, char in enumerate(PAN):
        if i > 4 and i < 9:
            if char == 'O':
                char = '0'
        temp = temp + char
    PAN = temp


    if Name == 'NAN':
        Name = temp[0]
    if FatherName == 'NAN':
        FatherName = temp[1]

    for text in OCR_text:
        if PAN == 'NAN' and re.search(panpatn, text):
            PAN = re.search(panpatn, text).group()
            break

    for text in OCR_text:
        if DOB == 'NAN' and re.search(datepatn, text):
            DOB = re.search(datepatn, text).group()
            break

    extracted = {
        'Pan_number': PAN,
        'Name': Name,
        'Father_Name': FatherName,
        'DOB': DOB
    }

    return PAN


if __name__ == "__main__":
    uvicorn.run(app, debug=True)