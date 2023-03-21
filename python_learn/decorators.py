def announce(f):
    def wrapper():
        print("About to run the function...")
        f()
        print("Done with the function")
        #cery important 
    return wrapper
        
@announce
def hello():
    print("hello, wei")
    

hello()