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
#include "RDocument.h"
#include "RDeleteAllEntitiesOperation.h"

RDeleteAllEntitiesOperation::RDeleteAllEntitiesOperation(bool undoable) :
    ROperation(undoable) {
}

RTransaction RDeleteAllEntitiesOperation::apply(RDocument& document, bool preview) const {
    RTransaction transaction(document.getStorage(), "Deleting object(s)", undoable);
    QSet<RObject::Id> ids =
        document.queryAllEntities();

    QSetIterator<RObject::Id> i(ids);
    while (i.hasNext()) {
        transaction.deleteObject(i.next(), &document);
    }

    transaction.end(&document);
    return transaction;
}

void RDeleteAllEntitiesOperation::preview(RDocument& /*document*/, RExporter& /*exporter*/) const {
}
