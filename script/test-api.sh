API_KEY=1a00692b-2757-47ae-aeb5-82d25ef72109
URL=https://$API_KEY@api.sncf.com/v1
# URL=https://api.navitia.io/v1
REGION=sncf

# curl -H "Authorization: $API_KEY" -X GET "$URL/coverage"

# echo "--------------------------------"
# curl -H "Authorization: $API_KEY" -X GET "$URL/coverage/$REGION/places?q=paris&type[]=stop_area"
curl -X GET "$URL/coverage/$REGION/places?q=Mantes-la-Jolie&type[]=stop_area" | jq .

# https://api.sncf.com/v1/coverage/sncf/places?q=Mantes-la-Jolie&type[]=stop_area
