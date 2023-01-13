# for i in range(6):
#     f = open('./json/' + str(i+1) + '.json','w')
#     f.write('{\n    \"name\":\"image' + str(i+1) + '\",\n   \"image\":\"tobechanged\",\n   \"description\":\"randomstuff\"\n}')

import requests
import os 
for i in os.listdir('./image'):
    file = open('./image/'+i, "rb")
    response = requests.post(
        "https://api.nftport.xyz/v0/files",
        headers={"Authorization": '2d6d9626-f643-422b-949b-b2f617227daf'},
        files={"file": file}
    )
    print(response.text)
    # ipfs_url jsonlara islenicek
    