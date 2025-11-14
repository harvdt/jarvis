"""add_camera_id_to_tree_and_iot_message_table

Revision ID: ef7b1dabfb1a
Revises: 948a5301031d
Create Date: 2025-11-13 08:49:17.551551

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ef7b1dabfb1a'
down_revision: Union[str, Sequence[str], None] = '948a5301031d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add camera_id column to tree table
    op.add_column('tree', sa.Column('camera_id', sa.Integer(), nullable=True))
    op.create_unique_constraint('uq_tree_camera_id', 'tree', ['camera_id'])

    # Create iot_message table
    op.create_table('iot_message',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
        sa.Column('camera', sa.Integer(), nullable=False),
        sa.Column('detections', sa.JSON(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_iot_message_id'), 'iot_message', ['id'], unique=True)


def downgrade() -> None:
    """Downgrade schema."""
    # Drop iot_message table
    op.drop_index(op.f('ix_iot_message_id'), table_name='iot_message')
    op.drop_table('iot_message')

    # Remove camera_id column from tree table
    op.drop_constraint('uq_tree_camera_id', 'tree', type_='unique')
    op.drop_column('tree', 'camera_id')
