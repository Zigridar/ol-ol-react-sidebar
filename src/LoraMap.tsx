import React, {useEffect} from "react"
import {Map, View} from "ol"
import {OSM} from "ol/source"
import {fromLonLat} from "ol/proj"
import {Tile} from "ol/layer"
import 'ol/ol.css'
import Sidebar, {PaneProps} from './Sidebar/Sidebar'
import {Control} from 'ol/control'

const MAP_ID = 'map'

const LoraMap = () => {

    useEffect(() => {
        const map = new Map({
            target: MAP_ID,
            layers: [
                new Tile({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([37.41, 8.82]),
                zoom: 4
            })
        })

        const control = new Control({
            element: document.querySelector('#sidebar')
        })

        map.addControl(control)
    }, [])

    const tabPanes: PaneProps[] = [
        {
            id: 'home',
            content: <div>Home</div>,
            headerText: 'Home'
        },
        {
            id: 'me',
            content: <div>Kek</div>,
            headerText: 'Test'
        }
    ]

    return(
        <>
            <Sidebar tabs={tabPanes} position={"left"} />
            <div style={{ height: '100%', width: '100%' }} id={MAP_ID} />
        </>
        )
}

export default LoraMap