people = [
    {"name": "Harry", "house": "Gryffindor"},
    {"name": "cho", "house": "Ravebclaw"},
    {"name": "Draco", "house": "Slytherin"}
]

# return the name of each element 
#def f(person):
    #return person["name"]


#because dict vouldn't sort , key refer by f by name 
#people.sort(key = f)

#another method 
people.sort(key = lambda person: person["name"])

print(people)