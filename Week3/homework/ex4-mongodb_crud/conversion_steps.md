Steps are:

- Go to <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>

- Click <button style="background-color: #13aa52; padding: 1rem; color: white; border-radius: .5rem;">Start free</button>

- Click <strong>Sign up with Google</strong>

- Enter your Gmail or Google Apps email address

- Click <strong>Next</strong>

- Enter Google account password

- Click <strong>Next</strong>

- Review and select the checkbox to accept the <strong>Terms of Service</strong> and the <strong>Privacy Policy</strong>

- Click <strong>Submit</strong>

- Go to <a href="https://www.mongodb.com/cloud/atlas">Atlas Login page</a>

- Click <strong>Log in with Google</strong>

- Follow the prompts to log in using your Google account

- <a href="https://docs.atlas.mongodb.com/tutorial/manage-organizations/#std-label-create-organization">Create an Atlas organization</a> and then create a <a href="https://docs.atlas.mongodb.com/tutorial/manage-projects/#std-label-create-project">project</a> in this organization. You will deploy your first cluster in this project

- Create the mongoDB Cluster by clicking on <button style="background-color: #13aa52; padding:.75rem; color: white; border-radius: .5rem;">Build a Cluster</button>

- Configure the network by white listing your IP address
- - Click <strong>Network Access</strong> on the left pane
- - Click <button style="background-color: #13aa52; padding:0 .2rem; color: white; border-radius: .5rem;"> + ADD IP ADDRESS</button>
- - Click <button>ADD CURRENT IP ADDRESS</button>
- - Click <button style="background-color: #13aa52; padding: .5rem; color: white; border-radius: .5rem;">Confirm</button>

- Install <a href="https://docs.mongodb.com/manual/mongo/">MongoDB shell</a> if not already installed

- Go back to the mongoDB Cluster by clicking on the Cluster name

- Click on the primary host for the cluster similar to <a href="#">\<cluster name>-shard-xx-xx-...</a> <button style="border-radius: .75rem;">PRIMARY</button>

- Copy the full host name similar to similar to \<cluster name>-shard-xx-xx-xxxxx-.mongodb.net:\<Port number>

- Go to your terminal, execute the following command and replace the \<PLACEHOLDERS> with the corresponding info<br>
  "mongoimport --host \<FULL_HOST_NAME:PORT_NUMBER> --db \<DATABASE_NAME> --type csv --file \<FILE_PATH> --authenticationDatabase admin --ssl --username \<USERNAME> --password \<PASSWORD>"

- Done!
