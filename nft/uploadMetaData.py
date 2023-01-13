# for i in range(6):
#     f = open('./json/' + str(i+1) + '.json','w')
#     f.write('{\n    \"name\":\"image' + str(i+1) + '\",\n   \"image\":\"tobechanged\",\n   \"description\":\"randomstuff\"\n}')

import requests
import os 
import json
 
for i in os.listdir('./json'):    
    with open('./json/'+i) as json_file:
        data = json.load(json_file)
        response = requests.post(
            "https://api.nftport.xyz/v0/metadata",
            headers={"Authorization": '2d6d9626-f643-422b-949b-b2f617227daf'},
            json=data
        )
        print(response.text)
        # metadata_uri depolancak isimle beraber