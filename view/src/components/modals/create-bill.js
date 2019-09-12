import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class CreateBill extends Component {
    static propTypes = {
        // prop: PropTypes
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBill);