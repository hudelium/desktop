import * as React from 'react'
import { createUniqueId, releaseUniqueId } from './id-pool'

interface IRadioButtonProps<T> {
  /**
   * Called when the user selects this radio button.
   */
  readonly onSelected: (
    value: T,
    event: React.FormEvent<HTMLInputElement>
  ) => void

  /**
   * Whether the radio button is selected.
   */
  readonly checked: boolean

  /**
   * The label of the radio button.
   */
  readonly label: string | JSX.Element

  /**
   * The value of the radio button.
   */
  readonly value: T
}

interface IRadioButtonState {
  readonly inputId: string
}

export class RadioButton<T extends string> extends React.Component<
  IRadioButtonProps<T>,
  IRadioButtonState
> {
  public constructor(props: IRadioButtonProps<T>) {
    super(props)

    this.state = {
      inputId: createUniqueId(`TextBox_${this.props.value}`),
    }
  }

  public componentWillUnmount() {
    releaseUniqueId(this.state.inputId)
  }

  public render() {
    return (
      <div className="radio-button-component">
        <input
          type="radio"
          id={this.state.inputId}
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.onSelected}
        />
        <label htmlFor={this.state.inputId}>{this.props.label}</label>
      </div>
    )
  }

  private onSelected = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSelected(this.props.value, evt)
  }
}
