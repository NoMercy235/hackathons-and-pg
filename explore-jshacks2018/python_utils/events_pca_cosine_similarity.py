import csv
import pandas as pd
from sklearn.decomposition import PCA
from sklearn import preprocessing
from scipy import spatial

current = 0
limit = 200

skip_header = False
events = []
data = []

with open('./all/events.csv') as csvfile:
    spamreader = csv.reader(csvfile, delimiter='\n', quotechar='|')
    for row in spamreader:
        if not skip_header:
            skip_header = True
            continue

        if current > limit:
            break

        event = row[0].split(',')

        events.append(event)
        data.append(event[10:-1])
        current += 1

    scaler = preprocessing.MinMaxScaler()
    scaler.fit(data)
    normalized = list(scaler.transform(data))
    # print(normalized)

    pca = PCA(n_components=3)
    principalComponents = pca.fit_transform(normalized)
    principalDf = pd.DataFrame(data=principalComponents, columns=['c1', 'c2', 'c3']).values

    # print(principalDf)

    events_similarity = []
    index = 0
    for event in events:
        events_similarity.append([])
        index += 1

        second_index = 0
        for second_event in events:
            second_index += 1
            if event[0] == second_event[0]:
                events_similarity[index - 1].append(1)
            else:
                similarity = 1- spatial.distance.cosine(
                    list(principalDf[index - 1]),
                    list(principalDf[second_index - 1])
                )
                events_similarity[index - 1].append(similarity)

    # for x in events_similarity:
    #     print(*x, sep=" ")

    f = open("events_similarity.txt", "w")
    for similarity in events_similarity:
        f.write(str(similarity))
        f.write('\n')
    f.close()