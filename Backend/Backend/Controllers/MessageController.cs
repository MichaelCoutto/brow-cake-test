using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("message")]
    public class MessageController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public MessageController(IWebHostEnvironment hostingEnvironment)
        {
            //Apenas para me dar acesso as variaveis de desenvolvimento e me permitir acessar a pasta dbs
            //dentro do root do projeto
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// Retorna o caminho para o arquivo Json, como não estou utilizando nenhuma base de dados em específico eu estou
        /// registrando os valores todos dentro de um Json
        /// </summary>
        private string MessagesDbsFile
        {
            get
            {
                string _rootPath = this._hostingEnvironment.ContentRootPath;
                string _fullPath = Path.Combine(_rootPath, "dbs/messages.json");
                return _fullPath;
            }
        }

        private List<Message> List
        {
            get
            {
                var jsonData = System.IO.File.ReadAllText(this.MessagesDbsFile);
                if (string.IsNullOrEmpty(jsonData))
                {
                    //Se for nulo, vai retornar a lista vazia 
                    return new List<Message>();
                } else
                {
                    //Deserealiza o objeto
                    List<Message> messages = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Message>>(jsonData);
                    return messages;
                }
            }
        }

        [HttpGet("list")]
        public List<Message> ListMessages()
        {
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return this.List;
        }

        [HttpPost("create")]
        public Message Register(string user, string text)
        {
            //Console.WriteLine(user);
            //Console.WriteLine(text);
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            //Cria o objeto principal
            Message _registar = new Message()
            {
                Uuid = Guid.NewGuid().ToString(),
                Name = user,
                Text = text,
                PostedAt = DateTime.Now
            };

            //Adiciona a lista
            List<Message> clonedList = this.List;
            clonedList.Add(_registar);

            //Salva no arquivo json, meio vulgar essa linha uma vez que não é um banco de dados
            //mas isso aqui é apenas um teste
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(clonedList);
            System.IO.File.WriteAllText(this.MessagesDbsFile, jsonString);

            return _registar;
        }


    }
}
