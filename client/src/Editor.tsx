import React, { Component } from 'react';
import { Building } from './buildings';


type EditorProps = {
  /** Names of all the buildings that are available to choose. */
  buildings: Array<Building>;

  /** Called to note that the selection has changed. */
  onEndPointChange: (endPoints?: [Building, Building]) => void;
};

type EditorState = {
  fromLocation: string;
  toLocation: string;
};


/** Component that allows the user to edit a marker. */
export class Editor extends Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {fromLocation: '', toLocation: ''};
  }

  handleLocationChange = (locationType: 'fromLocation' | 'toLocation', value: string) => {
    this.setState({ [locationType]: value } as Pick<EditorState, keyof EditorState>, () => {
      const { fromLocation, toLocation } = this.state;
      const fromBuilding = this.props.buildings.find((b) => b.longName === fromLocation);
      const toBuilding = this.props.buildings.find((b) => b.longName === toLocation);

      if (fromBuilding && toBuilding) {
        this.props.onEndPointChange([fromBuilding, toBuilding]);
      } else {
        this.props.onEndPointChange();
      }
    });
  };

  clear = () => {
    this.setState({fromLocation: '', toLocation: ''});
    this.props.onEndPointChange();
  };

  render = (): JSX.Element => {
    const buildings = this.props.buildings;
    const { fromLocation, toLocation } = this.state;

    return <div>
      <p>
        From: <select
            value={fromLocation}
            onChange={(e) => this.handleLocationChange('fromLocation', e.target.value)}
          >
            <option>Select a location</option>
            {buildings.map((building) => (
              <option key={building.longName} value={building.longName}>
                {building.longName}
              </option>
            ))}
          </select>
      </p>
      <p>
        To: <select
            value={toLocation}
            onChange={(e) => this.handleLocationChange('toLocation', e.target.value)}
          >
            <option>Select a location</option>
            {buildings.map((building) => (
              <option key={building.longName} value={building.longName}>
                {building.longName}
              </option>
            ))}
          </select>
      </p>
      <button onClick={this.clear}>
        Clear
      </button>
    </div>;
  };

}