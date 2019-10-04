import React, { Fragment, useState } from 'react'

import ChoiceModal from '@ui/ChoiceModal'
import CurrencyInputModal from '@ui/CurrencyInputModal'
import { openModal, toCurrencyReal } from '@utilities'

const defineDisplay = (column, colIndex, rowIndex, rowData) => {
  if(column.hasOwnProperty('display') && column.display == 'currency') {
    return <td key={`cell_${rowIndex}_${colIndex}`}>
      {rowData[column.name] ? toCurrencyReal(rowData[column.name]) : '-'}
    </td>
  }

  return <td key={`cell_${rowIndex}_${colIndex}`}>
    {rowData[column.name] ? rowData[column.name] : '-'}
  </td>
}

const RenderHeaders = ({ columns }) =>
  columns.map((column, index) => (
    <th key={`${column.name}_${index}`}>{column.label}</th>
  ))

const RenderRows = ({ columns, data, clickRow }) => {
  return (
    <Fragment>
      {data.map((rowData, rowIndex) => (
        <tr key={`row_${rowIndex}`}>
          <td className='icon text-center'>
            <input
              name='checked'
              type='checkbox'
              defaultChecked={rowData.checked}
              onChange={() => clickRow(rowIndex)}
            />
          </td>
          {columns.map((column, colIndex) => {
            return defineDisplay(column, colIndex, rowIndex, rowData)  
          })}
        </tr>
      ))}
      {data.length < 1 && (
        <tr>
          <td colSpan={6}>There are no pending items.</td>
        </tr>
      )}
    </Fragment>
  )
}

const CashierTable = props => {
  const [list, setList] = useState(props.data)
  let itemsToReturn = []
  let operation = null

  const clickRow = index => {
    const name = event.target.name
    const value = event.target.checked
    const newList = list.slice()
    newList[index][name] = value
    setList(newList)
  }

  const BodyInformation = () => {
    return `Confirm operation?`
  }

  const InputModalInformation = () => {
    return `Insert the value to credit:`
  }

  const confirmInputModal = (input) => {
    props.returnCredit(input)
  }

  const clickReturn = (items, buttonOperation) => {
    itemsToReturn = items
    operation = buttonOperation
    openModal('choiceModal')
  }

  return (
    <Fragment>
      <table
        className='table table-bordered dataTable'
        id='dataTable'
        width='100%'
        cellSpacing='0'
      >
        <thead>
          <tr>
            <th />
            <RenderHeaders columns={props.columns} />
          </tr>
        </thead>
        <tbody>
          <RenderRows
            {...props}
            data={list}
            clickRow={clickRow}
          />
          {props.totalAttributeName && (
            <tr>
              <td className='total' colSpan={3}>
              <span>Pago: </span>
                <span className='total-value'>
                  {toCurrencyReal(props.paid || 0)}
                </span>
                {` / `}
                <span>Pendente: </span>
                <span className='total-value'>
                  {toCurrencyReal(props.totalPrice || 0)}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <button
        onClick={() => clickReturn(list.filter(item => item.checked), 'pay')}
        className='btn btn-success right ml-20'
      >
        {props.buttonSelectedLabel || 'Return Selected'}
      </button>
      <button onClick={() => clickReturn(list, 'close')} className='btn btn-danger left mr-20'>
        {props.closeTicketLabel || 'Close Ticket'}
      </button>
      {/* <button onClick={() => openModal('inputModal')} className='btn btn-warning left mr-20'>
        {props.creditLabel || 'Credit'}
      </button> */}
      <button onClick={() => clickReturn(list.filter(item => item.checked), 'remove' )} className='btn btn-danger right ml-20'>
        {props.buttonDeleteLabel || 'Delete Selected'}
      </button>
      <ChoiceModal
        id='choiceModal'
        title='Confirmation'
        description={<BodyInformation />}
        onConfirm={() => props.returnCashierTable(itemsToReturn, operation)}
      />
      <CurrencyInputModal
        id='inputModal'
        title='Insert value'
        description={<InputModalInformation />}
        onConfirm={(input) => confirmInputModal(input)}
      />
    </Fragment>
  )
}

export default CashierTable
