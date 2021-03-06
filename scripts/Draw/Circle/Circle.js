/**
 * Copyright (c) 2011-2013 by Andrew Mustun. All rights reserved.
 * 
 * This file is part of the QCAD project.
 *
 * QCAD is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * QCAD is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with QCAD.
 */

/**
 * \defgroup ecma_draw_circle Circle Drawing Tools
 * \ingroup ecma_draw
 *
 * \brief This module contains ECMAScript implementations of various circle drawing tools.
 */
include("../Draw.js");

/**
 * \class Circle
 * \brief Base class for all circle drawing tools.
 * \ingroup ecma_draw_circle
 */
function Circle(guiAction) {
    Draw.call(this, guiAction);
}

Circle.prototype = new Draw();
Circle.includeBasePath = includeBasePath;

Circle.prototype.beginEvent = function() {
    Draw.prototype.beginEvent.call(this);

    if (!isNull(this.getGuiAction()) && this.getGuiAction().objectName=="CircleMenu") {
        EAction.showCadToolBarPanel("CircleToolsPanel");
        this.terminate();
    }
};

Circle.getMenu = function() {
    var menu = EAction.getSubMenu(
        Draw.getMenu(), 400, Circle.getTitle(), "circle", Circle.includeBasePath + "/Circle.svg"
    );
    menu.setProperty("scriptFile", Circle.includeBasePath + "/Circle.js");
    return menu;
};

Circle.getToolBar = function() {
    var tb = EAction.getToolBar(Circle.getTitle(), "Circle");
    tb.visible = false;
    return tb;
};

Circle.getCadToolBarPanel = function() {
    var mtb = Draw.getCadToolBarPanel();
    var actionName = "CircleMenu";
    if (!isNull(mtb) && mtb.findChild(actionName)==undefined) {
        var action = new RGuiAction(qsTr("Circle Tools"), mtb);
        action.setScriptFile(Circle.includeBasePath + "/Circle.js");
        action.objectName = actionName;
        action.setRequiresDocument(true);
        action.setIcon(Circle.includeBasePath + "/Circle.svg");
        action.setStatusTip(qsTr("Show circle tools"));
        action.setDefaultShortcut(new QKeySequence("w,c"));
        action.setNoState();
        action.setProperty("SortOrder", 400);
        action.setDefaultCommands(["circlemenu"]);
        CadToolBarPanel.prototype.addAction.call(mtb, action);
    }

    var tb = EAction.getCadToolBarPanel(Circle.getTitle(), "CircleToolsPanel", true);
    return tb;
};

Circle.getTitle = function() {
    return qsTr("&Circle");
};

Circle.prototype.getTitle = function() {
    return Circle.getTitle();
};
