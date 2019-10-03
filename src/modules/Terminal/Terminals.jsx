import React, { Fragment, useState, useEffect } from 'react'

import DataTable from '@ui/DataTable'
import Spinner from '@ui/Spinner'

import services from '@services'

const Terminals = ({ history }) => {
  const { getTerminals } = services
  const [terminals, setTerminals] = useState([])

  useEffect(() => {
    ;(async () => {
      fetchTerminals()
    })()
  }, [])

  const fetchTerminals = async () => {
    let result = await getTerminals()

    setTerminals(result.data.terminals)
  }

  const editTerminal = _id => {
    history.push(`/main/terminal/${_id}`)
  }

  const columns = [
    {
      label: 'Nome',
      name: 'name',
    },
  ]

  return (
    <Fragment>
      <h1 className='h3 mb-2 text-gray-800'>Terminais</h1>
      <p className='mb-4'>Listagem de terminais disponíveis.</p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                {terminals && terminals.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={terminals}
                    onEdit={editTerminal}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Terminals
