//Se utiliza ref para que al hacer algun cambio o recibir información, se actualicen los demas componentes. En otras palabras ser reactivo
import { ref, type Ref } from "vue";
import { IPost } from "@/interfaces/IPost";

class PostService {
  private posts: Ref<IPost[]>
  constructor(){
    this.posts = ref<IPost[]>([])
  }
  //Getter de la propiedad, con ello obtendremos(get) los posts
  getPosts(): Ref<IPost[]>{
    return this.posts
  }
  //Función para obtener los datos se utiliza async por las promesas de retorno ya que esperamos los datos
  //Para mas información https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
  async fetchAll(): Promise<void>{
    //Se utiliza un trycatch como buenas practicas al hacer peticiones
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      //Al ser una función async se utiliza await para obtener la respuesta y no la respuesta de una promesa
      const response = await fetch(url)
      //Ya tenemos la información pero ahora la pasamos a json
      const json = await response.json()
      //Ya tenemos el json ahora lo asignamos como valor a posts
      this.posts.value = await json
    } catch (error) {
      console.log(error);
    }
  }
}
export default PostService