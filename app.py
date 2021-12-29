"""
 Application of Programming Principles
 Assignment Template 2021 - Flask & Python
"""
import json
import os

from flask import Flask, render_template, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/api/add", methods=['GET'])
def add():
    """
    add()

    Takes 2 numbers from the Javascript request, adds the numbers then returns back to the front-end to be processed

    Returns:
    object: outputs JSON response to the API
    """
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")
    result = float(num1) + float(num2)

    response = make_response(
        jsonify(
            {
                "result": str(result)
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/subtract", methods=['GET'])
def subtract():
    """
    subtract()

    Takes 2 numbers from the Javascript request, subtracts the numbers then returns back to the front-end to be
    processed.

    Returns:
    object: outputs JSON response to the API
    """
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")
    result = float(num1) - float(num2)

    response = make_response(
        jsonify(
            {
                "result": str(result)
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/multiply", methods=['GET'])
def multiply():
    """
    multiply()

    Takes 2 numbers from the Javascript request, multiplies the numbers then returns back to the front-end to be
    processed

    Returns:
    object: outputs JSON response to the API
    """
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")
    result = float(num1) * float(num2)

    response = make_response(
        jsonify(
            {
                "result": str(result)
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/divide", methods=['GET'])
def divide():
    """
    divide()

    Takes 2 numbers from the Javascript request, divides the numbers then returns back to the front-end to be
    processed

    Checks to see if float(num2) is 0, if so, then replaces it with a "#div/0" string

    Returns:
    object: outputs JSON response to the API
    """
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")

    if float(num2) != 0:
        result = float(num1) / float(num2)
    else:
        result = "#DIV/0"

    response = make_response(
        jsonify(
            {
                "result": str(result)
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/journal", methods=['GET'])
def journal():
    """
    journal()

    Reads in the Journal file and then outputs it to the API, for JavaScript to fetch

    Returns:
    object: outputs JSON response to the API
    """
    absolute_path = os.path.dirname(os.path.abspath(__file__))
    file_path = absolute_path + "/data/journal.json"
    journal_json = open(file_path)
    data = json.load(journal_json)

    response = make_response(
        jsonify(
            {
                "result": data
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/journal/post", methods=['PUT'])
def journal_put_controller():
    """
    journal_put_controller()

    Reads in the Journal file and then dumps the contents with the new DATA in the correct format, with an indent of
    4 to ensure it's easily readable. Then passes a "JSON recieved" so that it can be debugged on the front-end

    Returns:
    object: outputs JSON response to the API
    """
    req = request.get_json()
    absolute_path = os.path.dirname(os.path.abspath(__file__))
    file_path = absolute_path + "/data/journal.json"
    with open(file_path, mode="r") as outfile:
        list = json.load(outfile)
        list["journals"] = req

    with open(file_path, mode="w") as infile:
        json.dump(list, infile, indent=4)

    response = make_response(
        jsonify(
            {
                "message": "JSON received"
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/thoughts", methods=['GET'])
def thoughts():
    """
    thoughts()

    Reads in the thoughts file and then outputs it to the API, for JavaScript to fetch

    Returns:
    object: outputs JSON response to the API
    """
    absolute_path = os.path.dirname(os.path.abspath(__file__))
    file_path = absolute_path + "/data/thoughts.json"
    thoughts_json = open(file_path)
    data = json.load(thoughts_json)

    response = make_response(
        jsonify(
            {
                "result": data
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/thought/post", methods=['PUT'])
def thought_put_controller():
    """
    thought_put_controller()

    Reads in the Journal file and then dumps the contents with the new DATA in the correct format, with an indent of
    4 to ensure it's easily readable. Then passes a "JSON recieved" so that it can be debugged on the front-end

    Returns:
    object: outputs JSON response to the API
    """
    req = request.get_json()
    absolute_path = os.path.dirname(os.path.abspath(__file__))
    file_path = absolute_path + "/data/thoughts.json"
    with open(file_path, mode="r") as outfile:
        list = json.load(outfile)
        list["thoughts"] = req

    with open(file_path, mode="w") as infile:
        json.dump(list, infile, indent=4)

    response = make_response(
        jsonify(
            {
                "message": "JSON received"
            }
        ), 200
    )

    response.headers["Content-Type"] = "application/json"
    return response


if __name__ == '__main__':
    app.run()
