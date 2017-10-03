import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    ButtonInput,
    ButtonGroup,
    Button
} from "react-bootstrap";

import { AuthService } from "./services/AuthService";
import { JobService } from "./services/JobService";

import { hashHistory  } from 'react-router';

import { withGoogleMap, GoogleMap, Marker, InfoBox, OverlayView } from "react-google-maps";

const STYLES = {
    overlayView: {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    }
}


const GetPixelPositionOffset = (width, height) => {
    return { x: -(width / 2), y: -(height / 2) };
}

const CreateJobGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={16}
        defaultCenter={{ lat: 50.8202949, lng: -0.1406958 }}
        onClick={props.onMapClick}>

        <OverlayView
            key='createJobKey'
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={props.currentPosition}
            getPixelPositionOffset={GetPixelPositionOffset}>
            <div style={STYLES.overlayView}>
                <img src='/assets/images/passenger.png' />
                <br />
                <Button
                    type='button'
                    bsSize='xsmall'
                    bsStyle='primary'
                    onClick={() => props.onMarkerClick()}
                    value='Create Job'>Create Job</Button>
            </div>
        </OverlayView>
    </GoogleMap>
));


export interface CreateJobState {
    currentPosition: {
        lat: number,
        lng: number
    };
}

export class CreateJob extends React.Component<undefined, CreateJobState> {

    private _authService: AuthService;
    private _jobService: JobService;


    constructor(props: any) {
        super(props);
        this._jobService = props.route.jobService;
        this._authService = props.route.authService;

        console.log("CreateJob ctor");
        console.log(this._jobService);


        if (!this._authService.isAuthenticated()) {
            hashHistory.push('/');
        }
        this.state = {
            currentPosition: { lat: 50.8202949, lng: -0.1406958 }
          };
    }

    render() {
        return (
            <Well className="outer-well">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4>SET YOUR CURRENT LOCATION</h4>
                            <h6>Click the map to set your current location</h6>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <CreateJobGoogleMap
                                containerElement={
                                    <div style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: 600,
                                        height: 600,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 20
                                    }} />
                                }
                                mapElement={
                                    <div style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: 600,
                                        height: 600,
                                        marginTop: 20,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 20
                                    }} />
                                }
                                onMapLoad={this._handleMapLoad}
                                onMapClick={this._handleMapClick}
                                currentPosition={this.state.currentPosition}
                                onMarkerClick={this._handleMarkerClick}
                                />
                        </Col>
                    </Row>
                 </Grid>
            </Well>
        );
    }

    _handleMarkerClick = () => {
        console.log('button on CreateJob overlay clicked');
    }

    _handleMapLoad = (map) => {
        if (map) {
            console.log(map.getZoom());
        }
    }

    _handleMapClick = (event) => {
        this.setState({
            currentPosition: event.latLng
        });
    }
}
