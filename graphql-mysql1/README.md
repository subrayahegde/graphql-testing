# Graphql-mySQL-crud
graphql curd with mysql express and node 


Crud Instructions 

# create
# mutation{
#   createUser(id:3,name:"turner",email:"iamturner@gmail.com",job_title:"ceo")
# }


# update
# mutation{
#   updateUserInfo(id:3,name:"kim_turner",email:"iamkim_turner@gmail.com",job_title:"assistant")
# }


#delete
# mutation{
#   deleteUser(id:3)
# }


# get all users
# {
#   getUsers{
#     id
#     name 
#     email
#     job_title
#   }
# }



# getSingleUser
# {
#   getUserInfo(id:2){
#     name 
#     email
#   }
# }


