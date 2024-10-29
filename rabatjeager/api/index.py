from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

@app.get("/api/python")
def hello_world():
    joke_url = "https://official-joke-api.appspot.com/jokes/programming/random"
    try:
        joke = requests.get(joke_url).json()
        return {"message": f"{joke[0]['setup']} {joke[0]['punchline']}"}
    except (IndexError, KeyError):
        raise HTTPException(status_code=500, detail="Error retrieving joke")
    except requests.RequestException:
        raise HTTPException(status_code=503, detail="Joke service unavailable")