import os 
import matplotlib.pyplot as plt


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

        
        print(date)
        plt.plot(date, value)
     
        # save plot to file
        plt.savefig('plots/' + file + '.png', bbox_inches='tight')
        # clear plot
        plt.clf()
        
        


