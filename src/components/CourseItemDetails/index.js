import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'PROCESS',
}

class CourseItemDetails extends Component {
  state = {
    courseDetails: [],
    apiStatus: apiStatusContext.initial,
    retry: false,
  }

  componentDidMount() {
    this.renderCourseDetails()
  }

  renderCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusContext.Loader})
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const courseDetailsData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetails: courseDetailsData,
        apiStatus: apiStatusContext.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails

    return (
      <li className="list-container">
        <img src={imageUrl} alt="name" className="image" />
        <div className="content-container">
          <h1 className="heading">{name}</h1>
          <p className="paragraph">{description}</p>
        </div>
      </li>
    )
  }

  onClickFailureView = () => {
    this.setState({retry: true})
    this.renderCourseDetails()
  }

  renderFailureView = () => {
    const {retry} = this.state
    return (
      <>
        {!retry && (
          <div className="failure-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
              alt="failure view"
              className="failure-image"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="error-paragraph">
              We cannot seem to find the page you are looking for
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
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={30} />
    </div>
  )

  renderShowCourseData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderSuccessView()
      case apiStatusContext.failure:
        return this.renderFailureView()
      case apiStatusContext.inprogress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="un-order-list">{this.renderShowCourseData()}</div>
      </>
    )
  }
}

export default CourseItemDetails
