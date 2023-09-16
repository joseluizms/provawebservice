import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize()
.then(async () => {
    const userController = new UserController();
    const postController = new PostController();
    
    let user = User.createUser('Jose Luiz', 'joseluiz@hotmail.com', '1111');
    user = await userController.registerUser(user);

    const posts: Post[] = [];

    for(let i = 0; i<= 100000; ++ i){
        let post = Post.createPost(`Titulo ${i}`, 'Conteudo');
        post.user = user;
        post = await postController.save(post);

    }
    user.posts = posts;
    
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })


const run = async () =>{
}

run();