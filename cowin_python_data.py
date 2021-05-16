import requests

from datetime import datetime, timedelta
import time

import json

age = 52
pinCodes = ["585403"]
num_days = 2

print_flag = 'Y'

print("Starting search for Covid vaccine slots!")

today_date = datetime.today()
list_of_days_result = [today_date + timedelta(days=i) for i in range(num_days)]
good_format_date_results = [i.strftime("%d-%m-%Y") for i in list_of_days_result]

while True:
    counter = 0   
    for pinCode in pinCodes:   
        for given_date in good_format_date_results:

            URL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode={}&date={}".format(pinCode, given_date)
            header = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'} 
            
            result = requests.get( URL, headers=header )
            # print('-------------------------------------------------------------')
            # print(result.text)
            # print('-------------------------------------------------------------')
            # print(result.status_code)
            if result.ok:
                response_from_json = result.json()
                print("==================================",response_from_json["centers"][0]["district_name"],"=========================================")

                flag = False
                if response_from_json["centers"]:            
                    if(print_flag.lower() =='y'):

                        for center in response_from_json["centers"]:
                            # print('-------------------------------------------------------------')
                            # print(center)
                            # print('-------------------------------------------------------------')

                            for start_session in center["sessions"]:
                                if (start_session["min_age_limit"] <= age and start_session["available_capacity"] > 0 ) :
                                    print('Pincode: ' + pinCode)
                                    print("Available on: {}".format(given_date))
                                    print("\t", center["name"])
                                    print("\t", center["block_name"])
                                    print("\t Price: ", center["fee_type"])
                                    print("\t Availablity : ", start_session["available_capacity"])

                                    if(start_session["vaccine"] != ''):
                                        print("\t Vaccine type: ", start_session["vaccine"])
                                    print("\n")

                                    counter = counter + 1
                                else:
                                    pass                                    
                else:
                    pass        
                          
            else:
                print("No Response!")

        if(counter == 0):
            print("No Vaccination slot avaliable!")
        else:
            print("Search Completed!")


        dt = datetime.now() + timedelta(minutes=3)

        while datetime.now() < dt:
            time.sleep(1)
            