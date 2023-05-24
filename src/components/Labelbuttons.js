import React from 'react'
import { Box } from '@mui/material'
import Labelbutton from './Labelbutton'

const Labelbuttons = ({ labels, data, category, catergoryPrefix, mutation }) => {
    const addOrRemove = (labels, clickedLabel) => {
      const labelExists = labels.includes(clickedLabel)
      if (labelExists) {
        return labels.filter((label) => { return label !== clickedLabel })
      } else {
        const newLabels = labels
        newLabels.push(clickedLabel)
        return newLabels
      }
  }

  const handleLabelClick = (label) => {
    const newLabels = addOrRemove(data.labels, label)
    mutation.mutate({
        labels: newLabels
    })
  }

  const createButton = label => {
    const status = data.labels.includes(label)
    return (
        <Labelbutton key={label} label={label} status={status} handleLabelButton={handleLabelClick} />
    )
  }

return (
    <Box>
      {category}:
      {labels.filter(label => label.includes(catergoryPrefix)).map(label => createButton(label))}
    </Box>
  )
}

export default Labelbuttons