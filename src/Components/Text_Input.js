import { CreateDelayer } from "utils/Delayer"
import { useState, useCallback, useMemo } from "react"


/**
 * Editable Text (input type="text")
 * @param {*} id mandatory identification, often related to id of entity 
 * @param {str} value value of input
 * @param {str} placeholder value of help if the text is not displayed
 * @param {(value) => void} onChange delayed callback notifying about the change
 * @returns input with delayer in it
 */
export const TextInput = ({ id, value, onChange, placeholder }) => {
    const [localValue, setLocalValue] = useState(value)

    const delayer = useMemo(
        () => CreateDelayer(), [id]
    )

    const localOnChange = useCallback(
        (e) => {
            const newValue = e.target.value
            setLocalValue(newValue)
            if (onChange) {
                delayer(() => onChange(newValue))
            }
        }, [id, onChange]
    )

    return (
        <input className="form-control" placeholder={placeholder} value={localValue} onChange={localOnChange} />
    )
}





const m = [
    {
      label: "Uni",
      children: [
        {
          label: "Fac",
          children: [
            {
              label: "Dep"
            },
            {
              label: "St"
            },
            {
              label: "22-5KB-A"
            },
            {
              label: "22-5KB-B"
            },
            {
              label: "22-5KB-C"
            },
            {
              label: "22-5KB-D"
            },
            {
              label: "22-5KB-E"
            },
            {
              label: "22-5KB-F"
            },
            {
              label: "22-5KB-G"
            },
            {
              label: "22-5KB-H"
            },
            {
              label: "22-5KB-I"
            },
            {
              label: "22-5KB-J"
            },
            {
              label: "správa"
            }
          ],
          expanded: true
        }
      ],
      expanded: true
    }
  ]
const pom=[
    {
        label: 'Argentina',
        expanded: true,
        children: [
            {
                label: 'Argentina',
                expanded: true,
                children: [
                    {
                        label: 'Argentina'
                    },
                    {
                        label: 'Croatia'
                    }
                ]
            },
            {
                label: 'France',
                expanded: true,
                children: [
                    {
                        label: 'France'
                    },
                    {
                        label: 'Morocco'
                    }
                ]
            }
        ]
    }
]