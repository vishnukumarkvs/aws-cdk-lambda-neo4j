import json
from neo4j import GraphDatabase
import os

def lambda_handler(event, context):
    # TODO: get the uri, user and password from environment variables or other sources
    uri = os.getenv("URI")
    user = os.getenv("USER")
    password = os.getenv("PASSWORD")
    
    # create a driver instance
    driver = GraphDatabase.driver(uri, auth=(user, password))
    
    # get the message from the event object
    message = event.get("message", "hello, world")
    
    # execute the query and get the greeting
    with driver.session() as session:
        greeting = session.execute_write(_create_and_return_greeting, message)
    
    # close the driver
    driver.close()
    
    # return the greeting as a response
    return {
        'statusCode': 200,
        'body': json.dumps(greeting)
    }

def _create_and_return_greeting(tx, message):
    result = tx.run("CREATE (a:Greeting) "
                    "SET a.message = $message "
                    "RETURN a.message + ', from node ' + id(a)", message=message)
    return result.single()