#creat new class 
class Flight():
    #create flight
    def __init__(self, capacity) :
        self.capacity = capacity
        self.passegers = []
        
        #add passengers 
    def add_passenger(self, name):
        if not self.open_seats():
            return False
        self.passegers.append(name)
        return True
        #open seats
    def open_seats(self):
        return self.capacity - len(self.passegers)
        
Flight = Flight(3)

people = ["Harry", "Ron", "Hermione", "Ginny"]

for person in people:
    success = Flight.add_passenger(person)
    if success:
        print(f"Added {person} to flight successfully")
    else:
        print(f"No avaliable seats for {person}")