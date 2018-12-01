mimport csv
from faker import Faker

faker = Faker()
current = 0
limit = 200

skip_header = False
resources = []
data = []

with open('./all/event_attendees.csv') as csvfile:
    spamreader = csv.reader(csvfile, delimiter='\n', quotechar='|')
    for row in spamreader:
        if not skip_header:
            skip_header = True
            continue

        if current > limit:
            break

        resource = row[0].split(',')

        # if resource[3] == '':
        #     continue

        resources.append(resource)
        # data.append(resource[10:-1])
        current += 1

    f = open("smaller_event_attendees.csv", "w")
    for resource in resources:
        # name = faker.name()
        # f.write(name + ',')
        f.write(','.join(resource))
        f.write(',\n')
    f.close()