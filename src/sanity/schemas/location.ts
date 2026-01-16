export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short catchy phrase (e.g., "Michigan\'s Ultimate Outdoor Escape")',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'region',
      title: 'Region/Forest',
      type: 'string',
      description: 'e.g., "Hoosier National Forest"',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'object',
      fields: [
        { name: 'campsites', title: 'Campsites', type: 'string' },
        { name: 'trails', title: 'Trails', type: 'string' },
        { name: 'acres', title: 'Acres', type: 'string' },
        { name: 'lakeSize', title: 'Lake Size', type: 'string' },
      ],
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
      ],
    },
    {
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Link to escape.baserves.com booking page',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'state',
      media: 'mainImage',
    },
  },
}
