import { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { compose, length, slice } from "ramda";
import { mapIndexed } from "ramda-godlike";

const tab = (label, index) => <Tab label={label} id={`tab-${index}`} aria-controls={`tabpanel-${index}`}/>

const pannel = value => (content, index) => (
    <div
        style={{marginTop: 56}}
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
    >
        {value === index && content}
    </div>
);

const panelTabs = (value, handleChange) => children => (
    <AppBar position="fixed">
        <Tabs 
            style={{height: 50}}
            value={value} 
            onChange={handleChange}
            variant="fullWidth"
        >
            {children}
        </Tabs>
    </AppBar>
);



export const tabs = (labels, content) => {
    const [value, setValue] = useState(0);

    const handleValueChange = (e, newValue) => setValue(newValue);

    return [
        compose(panelTabs(value, handleValueChange), mapIndexed(tab))(labels),
        compose(mapIndexed(pannel(value)), slice(0, length(labels)))(content)
    ];
}