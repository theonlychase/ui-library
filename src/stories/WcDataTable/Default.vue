<script>
  import Column from '../../components/ui/WcDataTable/Column.vue';
  export default {
    components: {
      Column,
    },
    data() {
      return {
        selectedUsers: null,
        columns: [
          { field: 'firstName', header: 'First Name' },
          { field: 'lastName', header: 'Last Name' },
          { field: 'email', header: 'Email' },
          { field: 'company', header: 'Company' },
          { field: 'date', header: 'Date' },
          // { field: 'actions', header: 'Actions' },
        ],
        users: [
          {
            id: 0,
            firstName: 'John',
            lastName: 'Doe',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 1,
            firstName: 'John1',
            lastName: 'Doe1',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 2,
            firstName: 'John2',
            lastName: 'Doe3',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 3,
            firstName: 'John4',
            lastName: 'Doe5',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 4,
            firstName: 'John6',
            lastName: 'Doe6',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 5,
            firstName: 'John7',
            lastName: 'Doe7',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 6,
            firstName: 'John8',
            lastName: 'Doe8',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
          {
            id: 7,
            firstName: 'John',
            lastName: 'Doe',
            email: 'JohnDoe@gmail.com',
            company: 'Company',
            date: '01/02/2022',
          },
        ],
      };
    },
    methods: {
      // selectedUsers() {
      //
      // }
    },
  };
</script>

<template>
  <WcDataTable
    v-model:selection="selectedUsers"
    data-key="id"
    :value="users"
    row-hover
    :rows="5"
    paginator
    responsive-layout="scroll"
  >
    <Column selection-mode="multiple" header-style="width: 3rem" />
    <Column
      v-for="col of columns"
      :key="col.field"
      :column-key="col.field"
      :field="col.field"
      :header="col.header"
      sortable
    />
  </WcDataTable>
</template>
