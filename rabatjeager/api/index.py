from fastapi import FastAPI
import requests


app = FastAPI()

@app.get("/api/python")
def hello_world():
    joke_url = "https://official-joke-api.appspot.com/jokes/programming/random"
    joke = requests.get(joke_url).json()

    return joke[0]["setup"] + " " + joke[0]["punchline"]