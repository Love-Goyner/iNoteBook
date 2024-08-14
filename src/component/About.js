import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function About(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <><div className='mt-3'>

    <h2 className={`text-${props.mode === "light"?"dark" :"light"}`}>About Me</h2>
    <div className="accordion" id="accordionExample">
  <div className={`accordion-item text-${props.mode === "light"?"dark" :"light"}`}>
    <h2 className="accordion-header">
      <button className={`accordion-button bg-${props.mode} text-${props.mode === "light"?"dark" :"light"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        INTRODUCTION
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className={`accordion-body bg-${props.mode}`}>
        <strong>Hello, I Am Love Goyner, </strong><br/> Institude of Enginner and Techonology, IET DAVV, Indore <br />
                ●  Bachelor of Technology, Electrical Engineering <br /><br />
                Brijpal Higher Secondary School, Morena, India <br />
                ●  MPBOARD (Class XII) <br /><br />
                Brijpal Higher Secondary School, Morena, India <br />
                ●  MPBOARD (Class X) <br />
      </div>
    </div>
  </div>
  <div className={`accordion-item text-${props.mode === "light"?"dark" :"light"}`}>
    <h2 className="accordion-header">
      <button className={`accordion-button bg-${props.mode} collapsed text-${props.mode === "light"?"dark" :"light"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        SKILLS
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className={`accordion-body bg-${props.mode}`}>
        <strong>The skills I possess include:</strong> <br />DSA, Java, HTML, CSS, JavaScript, PHP, SQL, C, C++, MySQL, MongoDB, Express, React, Next, Python 
      </div>
    </div>
  </div>
  <div className={`accordion-item text-${props.mode === "light"?"dark" :"light"}`}>
    <h2 className="accordion-header">
      <button className={`accordion-button bg-${props.mode} collapsed text-${props.mode === "light"?"dark" :"light"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        ACHIEVEMENT
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className={`accordion-body bg-${props.mode}`}>
        <strong>Projects Completed to Date:.</strong> <br /> PG Life (web) | HTML, CSS, JS, React, BootStrap, MySQL 	<br />
                                                                  ●	Developed a Solution For Finding a Suitable Hostel/PG for Students <br />
                                                                  ●	Using MySQL Database <br />
                                                                  ● Made a Clone of Spotify APP. <br />
                                                                  ● Online Website for Free Songs. <br />
                                                                  ● Make small Websites for Games like TikTakToe, Stone-Paper-Scissor.
      </div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}
