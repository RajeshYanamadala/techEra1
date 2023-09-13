import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    courseDetails: [],
    apiStatus: apiStatusContext.initial,
    retry: false,
  }

  componentDidMount() {
    this.setState({apiStatus: apiStatusContext.inprogress})
    setTimeout(() => {
      this.renderCourseDetails()
    }, 2000)
  }

  renderCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
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
    if (response.status === 404) {
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
    setTimeout(() => {
      this.setState({retry: false})
    }, 1000)
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
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader height={30} width={30} type="ThreeDots" color="#4656a1" />
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
