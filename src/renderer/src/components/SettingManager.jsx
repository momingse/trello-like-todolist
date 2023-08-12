import { useState } from 'react'
import { Tab, Tabs, Typography } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import BuildIcon from '@mui/icons-material/Build'
import styled, { withTheme, css } from 'styled-components'
import ExtraSettingPanel from './ExtraSettingPanel'
import GeneralSettingPanel from './GeneralSettingPanel'

const SettingContainer = styled.div`
  width: 100%;
  height: 100%;
`

const NavigationContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const StyledTabPanel = styled.div`
  padding: 1rem;
`

const SETTING = [
  {
    title: 'General',
    icon: <AppsIcon />,
    component: <GeneralSettingPanel />
  },
  {
    title: 'Extra',
    icon: <BuildIcon />,
    component: <ExtraSettingPanel />
  }
]

const SettingTabPanel = (props) => {
  const { children, value, index } = props

  return (
    <StyledTabPanel hidden={value !== index}>
      {value === index && (
        <div>
          <Typography>{children}</Typography>
        </div>
      )}
    </StyledTabPanel>
  )
}

const SettingManager = (props) => {
  const { theme } = props
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <SettingContainer>
      <NavigationContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.colors.secondaryBackground
            }
          }}
        >
          {SETTING.map((item, index) => (
            <Tab
              key={index}
              label={item.title}
              icon={item.icon}
              sx={{
                color: theme.colors.font,
                '&.Mui-selected': {
                  backgroundColor: theme.colors.secondaryBackground,
                  color: theme.colors.font
                }
              }}
            />
          ))}
        </Tabs>
      </NavigationContainer>
      {SETTING.map((item, index) => (
        <SettingTabPanel key={index} value={value} index={index}>
          {item.component}
        </SettingTabPanel>
      ))}
    </SettingContainer>
  )
}

export default withTheme(SettingManager)
