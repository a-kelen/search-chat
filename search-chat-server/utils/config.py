import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
CLIENT_URL = os.environ.get("CLIENT_URL")
GOOGLEAPIS_URL = os.environ.get("GOOGLEAPIS_URL")
GOOGLEAPIS_TOKEN = os.environ.get("GOOGLEAPIS_TOKEN")
GOOGLEAPIS_CX = os.environ.get("GOOGLEAPIS_CX")