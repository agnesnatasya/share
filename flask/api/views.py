from flask import Blueprint, request, jsonify
from . import db
from .models import *

main = Blueprint('main', __name__)
