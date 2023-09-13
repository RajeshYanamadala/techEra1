import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

const apiInitialStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'PROCESS',
}

class HomeRoute extends Component {
  state = {
    courseList: [],
    apiStatus: apiInitialStatus.initial,
  }

  componentDidMount() {
    this.setState({apiStatus: apiInitialStatus.process})
    setTimeout(() => {
      this.renderFetchCourseData()
    }, 1000)
  }

  renderFetchCourseData = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const courseData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courseList: courseData,
        apiStatus: apiInitialStatus.success,
      })
    }
    if (response.status === 400) {
      this.setState({apiStatus: apiInitialStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        <ul className="un-order-list">
          {courseList.map(eachData => (
            <CourseItem key={eachData.id} courseDetails={eachData} />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={30} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt=" failure view"
      />
      <h1 className="failure-heading">Oops! Something want Wrong</h1>
      <p className="error-paragraph">
        We cannot seem to find the page are looking for
      </p>
      <div>
        <button
          type="button"
          className="button"
          onClick={this.onClickFailureView}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderCourseData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiInitialStatus.success:
        return this.renderSuccessView()
      case apiInitialStatus.failure:
        return this.renderFailureView()
      case apiInitialStatus.process:
        return this.renderLoaderView()

      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">{this.renderCourseData()}</div>
      </>
    )
  }
}

export default HomeRoute
