// footer con 4 contenedores: logo, contacto, redes sociales, links hecho una grilla de bootstrap


function Footer() {
  return (
   <footer>
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-md-3">
                    <h2>Centro Médico</h2>                   
                </div>
                <div className="col-md-3">
                    <h3>Compañia</h3>
                    <p>
                        <a href="mailto:citas@gmail.com">
                            email
                        </a>
                    </p>
                    </div>
                <div className="col-md-3">
                    <h3>Comunidad</h3>
                    <p>
                        <a href="https://www.facebook.com/">
                            Facebook
                        </a>
                    </p>
                    <p>
                        <a href="https://www.instagram.com/">
                            Instagram
                        </a>
                    </p>
                    </div> 
                <div className="col-md-3">
                    <h3>Ayuda</h3>
                    <p>
                        Texto de ayuda y links
                    </p>
                    <p>
                       Texto de ayuda
                    </p>
                    </div>
            </div>
        </div>
        

   </footer>
  )
}

export default Footer