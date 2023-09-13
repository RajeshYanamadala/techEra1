import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="course-link">
      <li className="list-items">
        <img src={logoUrl} alt="name" className="course-image" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
