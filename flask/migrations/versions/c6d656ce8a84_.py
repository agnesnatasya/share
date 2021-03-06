"""empty message

Revision ID: c6d656ce8a84
Revises: d49b4c2d9766
Create Date: 2020-07-10 16:35:45.828621

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c6d656ce8a84'
down_revision = 'd49b4c2d9766'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'id_token')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('id_token', sa.VARCHAR(length=1000), nullable=True))
    # ### end Alembic commands ###
