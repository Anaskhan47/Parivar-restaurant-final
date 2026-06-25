from pydantic import BaseModel, EmailStr
from typing import List, Optional, Union
from datetime import datetime
from app.database.models import UserRole, TableStatus, OrderStatus, OrderType, OrderItemStatus, PaymentMethod, PaymentStatus, CateringStatus

# --- Users ---
class UserBase(BaseModel):
    username: str
    role: UserRole
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True

# --- Auth ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None

# --- Restaurant Tables ---
class TableBase(BaseModel):
    table_number: str
    capacity: int = 4
    status: TableStatus = TableStatus.AVAILABLE

class TableCreate(TableBase):
    pass

class TableUpdate(BaseModel):
    status: Optional[TableStatus] = None
    capacity: Optional[int] = None

class TableActiveOrder(BaseModel):
    id: int
    status: OrderStatus
    total_amount: float
    guest_count: int
    waiter_username: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class TableResponse(TableBase):
    id: int
    active_order: Optional[TableActiveOrder] = None

    class Config:
        from_attributes = True

# --- Categories & Menu Items ---
class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    is_available: bool = True
    category_id: int

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None
    category_id: Optional[int] = None

class MenuItemResponse(MenuItemBase):
    id: int

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class CategoryResponse(CategoryBase):
    id: int
    menu_items: List[MenuItemResponse] = []

    class Config:
        from_attributes = True

# --- Customers ---
class CustomerBase(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerResponse(CustomerBase):
    id: int
    visit_count: int
    total_spend: float

    class Config:
        from_attributes = True

# --- Orders & Items ---
class OrderItemBase(BaseModel):
    menu_item_id: Union[int, str]
    quantity: int
    special_notes: Optional[str] = None

class OrderItemCreate(OrderItemBase):
    pass

class OrderAddItems(BaseModel):
    items: List[OrderItemCreate]

class OrderItemOrderResponse(BaseModel):
    id: int
    order_type: OrderType
    table_id: Optional[int] = None
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    status: OrderStatus
    table: Optional[TableResponse] = None

    class Config:
        from_attributes = True

class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    menu_item_id: int
    quantity: int
    unit_price: float
    status: OrderItemStatus
    special_notes: Optional[str] = None
    created_at: datetime
    menu_item: Optional[MenuItemResponse] = None
    order: Optional[OrderItemOrderResponse] = None

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    table_id: Optional[int] = None
    customer_id: Optional[int] = None
    waiter_id: Optional[int] = None
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    order_type: OrderType = OrderType.DINE_IN
    guest_count: int = 1

class OrderCreate(OrderBase):
    items: List[OrderItemCreate] = []

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None

class TimelineEventResponse(BaseModel):
    id: int
    description: str
    created_at: datetime

    class Config:
        from_attributes = True

class BillCreate(BaseModel):
    order_id: int

class BillBase(BaseModel):
    order_id: int
    subtotal: float
    tax_amount: float
    service_fee: float
    grand_total: float
    is_sent: bool = False

class BillResponse(BillBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class OrderResponse(OrderBase):
    id: int
    status: OrderStatus
    total_amount: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[OrderItemResponse] = []
    timeline_events: List[TimelineEventResponse] = []
    bill: Optional[BillResponse] = None

    class Config:
        from_attributes = True

# --- Payments ---
class PaymentBase(BaseModel):
    order_id: int
    amount: float
    method: PaymentMethod

class PaymentCreate(PaymentBase):
    pass

class PaymentResponse(PaymentBase):
    id: int
    status: PaymentStatus
    created_at: datetime

    class Config:
        from_attributes = True

# --- Catering ---
class CateringBase(BaseModel):
    customer_name: str
    phone: str
    email: Optional[EmailStr] = None
    event_type: Optional[str] = None
    event_date: Optional[datetime] = None
    guest_count: Optional[int] = None
    requirements: Optional[str] = None

class CateringCreate(CateringBase):
    pass

class CateringUpdate(BaseModel):
    status: CateringStatus

class CateringResponse(CateringBase):
    id: int
    status: CateringStatus
    created_at: datetime

    class Config:
        from_attributes = True
