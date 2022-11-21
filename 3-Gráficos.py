import os 
from matplotlib import pyplot as plt
import matplotlib.dates as mdates

import pandas as pd
# remove all files in folder

# make a list of files and remove them one by one
filelist = [ f for f in os.listdir("./plots") if f.endswith(".png") ]
for f in filelist:
    os.remove(os.path.join("./plots", f))

# read files in a folder
import os
for file in os.listdir("predictions"):
    if file.endswith(".csv"):
        print(os.path.join("folder", file))
        # read file 
        import pandas as pd
        df = pd.read_csv(os.path.join("predictions", file))
        
        date = df['x'] .tolist()
        value = df['y'].to_list()


        # map date list to date time using MM-YYYY format
        date = [pd.to_datetime(d, format='%m-%Y') for d in date]
        # format values to number 
        value = [float(v) for v in value]

        # show months in x axis
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m-%Y'))
        plt.gca().xaxis.set_major_locator(mdates.MonthLocator(interval=3))
        
        plt.figure(figsize=(12,8))
        
        plt.plot(date, value)
        plt.gcf().autofmt_xdate()
        plt.title(file)

        plt.savefig(os.path.join("plots", file + '.png'), dpi=600 )
        #plt.show()
        plt.close()
        
   
        
        


