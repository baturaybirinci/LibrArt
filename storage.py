from flask import Flask, request
import pandas as pd

app = Flask(__name__)
dataframe = pd.read_csv('./storage.csv')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.json['data']
        num = request.json['num']
        owner = request.json['owner']
        print(data)

        df2 = {"contract":data,"maxlenght":num,"creator":owner}
        dataframe.append(df2,ignore_index=True)
        print(dataframe)
        dataframe.to_csv('./storage.csv')
        return 'Data stored successfully.'
    return ("ok",200)

if __name__ == '__main__':
    app.run()