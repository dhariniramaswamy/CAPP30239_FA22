import pandas as pd
import datetime as dt


# Cleaning for ridership line chart
df_ridership = pd.read_csv("daily_boarding_totals.csv")
df_ridership = df_ridership.drop(columns=["rail_boardings", "total_rides"])
df_ridership['year'] = pd.DatetimeIndex(df_ridership['service_date']).year
df_2018 = df_ridership[df_ridership['year'] == 2018]
df_2019 = df_ridership[df_ridership['year'] == 2019]
df_2020 = df_ridership[df_ridership['year'] == 2020]
df_2021 = df_ridership[df_ridership['year'] == 2021]
df_2022 = df_ridership[df_ridership['year'] == 2022]
riders = pd.concat([df_2018, df_2019, df_2020, df_2021, df_2022])
riders = riders.groupby("year")["bus"].sum()
riders = riders.to_frame()
riders.columns = ["year", "total_bus_rides"]
riders.to_csv("data/riders.csv", index=False)

# Cleaning for employees bar chart
csvs = [(2018,"CTA_Employees_2018.csv"), (2019, "CTA_Employees_2019_1.csv"), \
    (2020, "CTA_Employees_2020_8.csv"), (2021, "CTA_Employees_2021_9.csv"), \
        (2022, "CTA_Employees_2022_7.csv")]

def process_emp(pair):
    year, csv = pair
    df = pd.read_csv(csv)
    df = df[df['DIVISION'].str.contains('Bus', regex=False, case=False, na=False)]
    return year, len(df)

final = []
for pair in csvs:
    final.append((process_emp(pair)))
emp_df = pd.DataFrame(final, columns=["year", "num_emp"])
emp_df.to_csv("/data/emp.csv")

#Cleaning for expenses ring chart

# def process_exp(csv):
#     df = pd.read_csv(csv)
