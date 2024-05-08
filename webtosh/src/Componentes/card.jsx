import { Link } from "react-router-dom"
import Kurumi from "../img/tokisaki.jpg"
export const Card = (Parametros) => {
  let card01="max-w-64 bg-emerald-400 text-green-200 text-lg font-semibold break-words hyphens-auto text-center text-wrap whitespace-pre-line"

  return (
    <Link to="/portal">
    <div className={card01}>
      {Parametros.map((objeto, index)=>( <div key={index}>
        {(objeto.titulo) ? <span>{objeto.titulo}</span> : <span>Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu</span> }
        {(objeto.perfil) ? <div className="content-center"><img className="box-border bg-green-500" src={objeto.perfil} alt="Descripción" /></div>:
          <div className="content-center" > <img className="box-border bg-green-500" src={Kurumi} alt="Descripción" /> </div>} 
      </div> ))}
    </div>
    </Link>
  )
}
