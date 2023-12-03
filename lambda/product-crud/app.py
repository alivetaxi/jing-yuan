import boto3

dynamo = boto3.client('dynamodb')
table_name = 'Product'

def lambda_handler(event, context):
    print(event)
    return 'Excellent!'
    # match event["action"]:
    #     case "CREATE":
    #         print("You can become a web developer.")
    #         return "Created"
    #     case "UPDATE":
    #         print("You can become a Data Scientist")
    #         return "Updated"
    #     case "DELETE":
    #         print("You can become a backend developer")
    #         return "Deleted"
    #     case _:
    #         return "Invalid Action"
